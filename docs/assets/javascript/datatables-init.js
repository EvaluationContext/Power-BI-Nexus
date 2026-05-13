// Initialize DataTables only on the resources page and learning tracks
let isInitializing = false;
let isInitialized = false;

async function initializeDataTables() {
  // Only run on resources page or learning tracks
  if (!window.location.pathname.includes('/resources') && 
      !window.location.pathname.includes('/learning-tracks')) {
    return;
  }

  // Prevent multiple simultaneous initializations
  if (isInitializing || isInitialized) {
    return;
  }

  isInitializing = true;
  
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
            order: [[0, 'asc']],
            autoWidth: false, // Disable automatic column width calculation
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
        } catch (error) {
          console.error('DataTables initialization error:', error);
        }
      }, 100);
    });
    
    isInitialized = true;
  }
  
  isInitializing = false;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeDataTables);

// Handle Material theme instant navigation
if (typeof document$ !== 'undefined') {
  document$.subscribe(function() {
    // Only reset and reinitialize if navigating to resources/learning-tracks page
    if (window.location.pathname.includes('/resources') || 
        window.location.pathname.includes('/learning-tracks')) {
      isInitialized = false;
      isInitializing = false;
      initializeDataTables();
    }
  });
}
