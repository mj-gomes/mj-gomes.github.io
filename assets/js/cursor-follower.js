document.addEventListener("DOMContentLoaded", function() {
    console.log("Cursor follower script loaded");

    const cursorFollower = document.createElement("div");
    cursorFollower.id = "cursor-follower";
    document.body.appendChild(cursorFollower);

    const numberOfElements = 10; // Number of elements to follow the cursor

    // Create elements
    for (let i = 0; i < numberOfElements; i++) {
        const element = document.createElement("div");
        element.classList.add("cursor-element");
        cursorFollower.appendChild(element);
    }

    const elements = document.querySelectorAll(".cursor-element");

    // Track cursor position
    document.addEventListener("mousemove", function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Update positions of elements
        elements.forEach((element, index) => {
            // Apply a delay based on the index to create a trailing effect
            setTimeout(() => {
                element.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }, index * 50);
        });
    });
});
```

Now, let's add the CSS for the cursor-follower elements:
