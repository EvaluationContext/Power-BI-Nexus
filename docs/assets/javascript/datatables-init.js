// Initialize DataTables only on the resources page and learning tracks
function initializeDataTables() {
  // Only run on resources page or learning tracks
  if (!window.location.pathname.includes('/resources') && 
      !window.location.pathname.includes('/learning-tracks')) {
    return;
  }
  
  // Wait for DataTables library to be loaded
  if (typeof jQuery !== 'undefined' && jQuery.fn.DataTable) {
    
    // Initialize DataTables on tables in the resources page
    jQuery('table').each(function() {
      const tableElement = this;
      
      // Skip if already initialized
      if (jQuery.fn.DataTable.isDataTable(tableElement)) {
        return;
      }

      // Verify table has tbody and thead
      const thead = tableElement.querySelector('thead');
      const tbody = tableElement.querySelector('tbody');
      
      if (!thead || !tbody) {
        console.log('Skipping table without proper thead/tbody structure');
        return;
      }

      // Check if this is the main content table (not in an admonition or code block)
      const parent = jQuery(tableElement).closest('.admonition, pre, code');
      if (parent.length > 0) {
        console.log('Skipping table inside admonition or code block');
        return;
      }

      // Add upvote column to table header
      addUpvoteColumn(tableElement);
      
      // Verify column count consistency
      const theadRow = thead.querySelector('tr');
      const headerColCount = theadRow ? theadRow.querySelectorAll('th').length : 0;
      const rows = tbody.querySelectorAll('tr');
      
      let hasInconsistentColumns = false;
      rows.forEach((row, idx) => {
        const cellCount = row.querySelectorAll('td').length;
        if (cellCount !== headerColCount) {
          console.warn(`Row ${idx} has ${cellCount} cells but header has ${headerColCount} columns`);
          hasInconsistentColumns = true;
        }
      });
      
      if (hasInconsistentColumns) {
        console.error('Table has inconsistent columns. Skipping DataTables initialization.');
        return;
      }
      
      // Small delay to ensure DOM is fully updated
      setTimeout(() => {
        if (jQuery.fn.DataTable.isDataTable(tableElement)) {
          return; // Already initialized
        }

        try {
          // Initialize the table
          const table = jQuery(tableElement).DataTable({
            paging: true,
            pageLength: window.location.pathname.includes('/learning-tracks') ? 25 : 11,
            lengthChange: false,
            info: false,
            ordering: true, // Enable sorting
            order: [[4, 'desc']], // Sort by Upvotes column (index 4)
            autoWidth: false, // Disable automatic column width calculation
            columnDefs: [
              {
                // Upvotes column - simple numeric sorting
                targets: 4,
                type: 'num',
                orderable: true
              }
            ],
            language: {
              search: "Search:",
              searchPlaceholder: "Type to search..."
            }
          });

          // Handle window resize to adjust table width
          let resizeTimeout;
          jQuery(window).on('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
              if (jQuery.fn.DataTable.isDataTable(tableElement)) {
                table.columns.adjust().draw();
              }
            }, 250);
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
        } catch (error) {
          console.error('DataTables initialization error:', error);
        }
      }, 100);
    });
  }
}// Add upvote column to table
function addUpvoteColumn(table) {
  const thead = table.querySelector('thead tr');
  const tbody = table.querySelector('tbody');
  
  if (!thead || !tbody) return;

  // Check if upvote column already exists
  const existingUpvoteHeader = thead.querySelector('th:last-child');
  if (existingUpvoteHeader && existingUpvoteHeader.textContent.trim() === 'Upvotes') {
    console.log('Upvotes column already exists, skipping');
    return;
  }

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
