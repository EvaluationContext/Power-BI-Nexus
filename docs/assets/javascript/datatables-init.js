// Initialize DataTables only on the resources page
function initializeDataTables() {
  // Only run on resources page
  if (!window.location.pathname.includes('/resources')) {
    return;
  }
  
  // Wait for DataTables library to be loaded
  if (typeof jQuery !== 'undefined' && jQuery.fn.DataTable) {
    
    // Initialize DataTables on tables in the resources page
    jQuery('table').each(function() {
      // Skip if already initialized
      if (jQuery.fn.DataTable.isDataTable(this)) {
        return;
      }

      // Add upvote column to table header
      addUpvoteColumn(this);
      
      // Initialize the table
      const table = jQuery(this).DataTable({
        paging: true,
        pageLength: 11,
        lengthChange: false,
        info: false,
        ordering: true, // Enable sorting
        order: [[4, 'desc']], // Sort by Upvotes column (index 4) descending by default
        columnDefs: [
          {
            // Upvotes column - simple numeric sorting
            targets: 4,
            type: 'num'
          }
        ],
        language: {
          search: "Search:",
          searchPlaceholder: "Type to search..."
        }
      });

      // Refresh table sorting when votes update
      if (window.upvoteManager) {
        const originalUpdate = window.upvoteManager.updateVoteCount.bind(window.upvoteManager);
        window.upvoteManager.updateVoteCount = function(resourceId) {
          originalUpdate(resourceId);
          // Update data-order attribute and redraw
          setTimeout(() => {
            const voteCount = window.upvoteManager.getVoteCount(resourceId);
            jQuery(`td[data-vote-count]`).each(function() {
              const container = jQuery(this).find(`[data-resource-id="${resourceId}"]`);
              if (container.length) {
                jQuery(this).attr('data-order', voteCount);
                jQuery(this).attr('data-vote-count', voteCount);
              }
            });
            table.rows().invalidate().draw(false);
          }, 100);
        };
      }
    });
  }
}

// Add upvote column to table
function addUpvoteColumn(table) {
  const thead = table.querySelector('thead tr');
  const tbody = table.querySelector('tbody');
  
  if (!thead || !tbody) return;

  // Add header
  const th = document.createElement('th');
  th.textContent = 'Upvotes';
  th.style.width = '100px';
  th.style.textAlign = 'center';
  thead.appendChild(th);

  // Add upvote cell to each row
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length > 0) {
      // Get resource name from first cell (Source column)
      const firstCell = cells[0];
      const link = firstCell.querySelector('a');
      const resourceName = link ? link.textContent.trim() : firstCell.textContent.trim();
      
      // Create resource ID
      const resourceId = window.upvoteManager 
        ? window.upvoteManager.getResourceId(resourceName)
        : resourceName.toLowerCase().replace(/[^a-z0-9]/g, '_');

      // Get current vote count
      const voteCount = window.upvoteManager 
        ? window.upvoteManager.getVoteCount(resourceId)
        : 0;

      // Create upvote cell
      const td = document.createElement('td');
      td.style.textAlign = 'center';
      td.setAttribute('data-vote-count', voteCount);
      td.setAttribute('data-order', voteCount); // For DataTables sorting
      
      if (window.upvoteManager) {
        td.innerHTML = window.upvoteManager.createUpvoteButton(resourceName, resourceId);
      } else {
        td.innerHTML = `<div class="upvote-container upvote-loading">Loading...</div>`;
      }
      
      row.appendChild(td);
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeDataTables);

// Handle Material theme instant navigation
document$.subscribe(function() {
  initializeDataTables();
});
