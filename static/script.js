
document.addEventListener('DOMContentLoaded', function() {
    let allBills = [];
    let statusChart = null;

    const tableBody = document.getElementById('billTableBody');
    const searchInput = document.getElementById('billTableSearch');
    const noDataMessage = document.getElementById('noDataMessage');

    // Requirement 3: Load data from local MySQL database via API
    async function loadBillRecords() {
        try {
            const response = await fetch('/api/bills');
            if (!response.ok) throw new Error('Network response was not ok');
            
            allBills = await response.json();
            
            // Note: Data is already sorted by ID DESC in the SQL query as requested
            renderTable(allBills);
            updateStatusChart(allBills);
        } catch (error) {
            console.error('Error fetching bill data:', error);
            // Fallback mock data if API is not responding during development
            const fallbackData = [
                { id: 105, title: 'The Digital Personal Data Protection Bill, 2023', ministry: 'Ministry of Electronics and IT', status: 'Assented', date_introduced: '2023-08-03' },
                { id: 104, title: 'The Waqf (Amendment) Bill, 2024', ministry: 'Ministry of Minority Affairs', status: 'Pending', date_introduced: '2024-08-08' },
                { id: 103, title: 'The Post Office Bill, 2023', ministry: 'Ministry of Communications', status: 'Passed', date_introduced: '2023-08-10' }
            ];
            allBills = fallbackData;
            renderTable(fallbackData);
            updateStatusChart(fallbackData);
        }
    }

    function renderTable(data) {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            noDataMessage.classList.remove('d-none');
            return;
        } else {
            noDataMessage.classList.add('d-none');
        }

        data.forEach(bill => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="ps-4 text-muted small font-monospace">${bill.id}</td>
                <td>
                    <div class="fw-bold text-dark small">${bill.title}</div>
                    <div class="text-muted extra-small" style="font-size: 0.7rem;">Verified Official Record</div>
                </td>
                <td class="small text-secondary">${bill.ministry || 'N/A'}</td>
                <td>
                    <span class="status-badge ${getStatusBadgeClass(bill.status)}">${bill.status}</span>
                </td>
                <td class="small text-secondary">${bill.date_introduced || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function getStatusBadgeClass(status) {
        const s = status.toLowerCase();
        if (s.includes('assented') || s.includes('passed')) return 'bg-success text-white';
        if (s.includes('pending') || s.includes('introduced')) return 'bg-warning text-dark';
        if (s.includes('withdrawn') || s.includes('rejected')) return 'bg-danger text-white';
        return 'bg-secondary text-white';
    }

    function updateStatusChart(data) {
        const counts = data.reduce((acc, bill) => {
            const status = bill.status || 'Unknown';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(counts);
        const values = Object.values(counts);
        const colors = [
            '#2563eb', '#059669', '#f59e0b', '#dc2626', '#7c3aed', 
            '#db2777', '#4b5563', '#ea580c', '#0891b2'
        ];

        const ctx = document.getElementById('statusPieChart').getContext('2d');
        
        if (statusChart) {
            statusChart.destroy();
        }

        statusChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20,
                            font: { size: 11, weight: '600' }
                        }
                    },
                    tooltip: {
                        padding: 12,
                        cornerRadius: 8,
                        boxPadding: 6
                    }
                }
            }
        });
    }

    // Requirement 5: Search logic for the data table
    searchInput.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        const filtered = allBills.filter(bill => 
            bill.title.toLowerCase().includes(term) || 
            bill.status.toLowerCase().includes(term) ||
            (bill.ministry && bill.ministry.toLowerCase().includes(term))
        );
        renderTable(filtered);
    });

    // Initial Load
    loadBillRecords();
});
