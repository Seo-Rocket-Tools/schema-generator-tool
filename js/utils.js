function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toggleCollapsible(element) {
    element.classList.toggle("active");
    const content = element.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
} 