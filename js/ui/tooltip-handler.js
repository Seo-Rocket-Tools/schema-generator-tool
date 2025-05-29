// Tooltip positioning handler
document.addEventListener('DOMContentLoaded', function() {
    // Handle tooltip positioning dynamically
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('tooltip') || e.target.parentElement?.classList.contains('tooltip')) {
            const tooltip = e.target.classList.contains('tooltip') ? e.target : e.target.parentElement;
            const tooltipText = tooltip.querySelector('.tooltip-text');
            
            if (tooltipText) {
                // Get tooltip dimensions and position
                const rect = tooltip.getBoundingClientRect();
                const tooltipWidth = 250;
                const tooltipHeight = tooltipText.scrollHeight || 100;
                
                // Calculate position
                let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
                let top = rect.top - tooltipHeight - 10;
                
                // Check if tooltip goes off the left edge
                if (left < 10) {
                    left = 10;
                }
                
                // Check if tooltip goes off the right edge
                if (left + tooltipWidth > window.innerWidth - 10) {
                    left = window.innerWidth - tooltipWidth - 10;
                }
                
                // Check if tooltip goes off the top edge
                if (top < 10) {
                    // Position below the element instead
                    top = rect.bottom + 10;
                }
                
                // Apply position
                tooltipText.style.left = left + 'px';
                tooltipText.style.top = top + 'px';
            }
        }
    });
    
    // Hide tooltip on scroll to prevent positioning issues
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        document.querySelectorAll('.tooltip-text').forEach(tooltip => {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.querySelectorAll('.tooltip-text').forEach(tooltip => {
                tooltip.style.visibility = '';
                tooltip.style.opacity = '';
            });
        }, 150);
    }, true);
});