export function getWebviewContent(
    comments: { text: string; line: number; file: string }[],
): string {
    const fileName = comments[0]?.file || 'Unknown File';
    const totalComments = comments.length;

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Comments Highlighter</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            function copyComment(commentText) {
                navigator.clipboard.writeText(commentText).then(() => {
                    alert("Comment copied to clipboard!");
                });
            }

            function filterComments() {
                const searchInput = document.getElementById("searchInput").value.toLowerCase();
                const commentItems = document.querySelectorAll(".comment-item");
                let hasResults = false;

                commentItems.forEach(item => {
                    const text = item.getAttribute("data-text").toLowerCase();
                    if (text.includes(searchInput)) {
                        item.style.display = "flex";
                        hasResults = true;
                    } else {
                        item.style.display = "none";
                    }
                });

                const noResults = document.getElementById("noResults");
                noResults.style.display = hasResults ? "none" : "block";
            }
        </script>
    </head>
    <body class="bg-gray-50 text-gray-800 font-sans p-6">
        <!-- Header -->
        <header class="mb-6 flex items-center gap-4">
            <div>
                <h1 class="text-3xl font-bold text-blue-600 mb-2">Actionable Comments</h1>
                <p class="text-gray-600 text-sm">Easily find and manage actionable comments in your code.</p>
            </div>
        </header>

        <!-- File Info -->
        <section class="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <strong>File:</strong> ${fileName}
                </div>
                <button
                    class="text-blue-600 hover:text-blue-800 flex items-center"
                    onclick="copyComment('${fileName}')">
                    📋 Copy File Name
                </button>
            </div>
            <div class="mt-2">
                <strong>Total Comments:</strong> <span class="text-lg font-bold">${totalComments}</span>
            </div>
        </section>

        <!-- Search Bar -->
        <div class="mb-4">
            <input
                id="searchInput"
                type="text"
                placeholder="Filter comments (e.g., TODO, FIX, BUG)..."
                class="w-full p-3 border rounded-lg"
                oninput="filterComments()"
            />
        </div>

        <!-- Comments List -->
        <ul class="list-none p-0">
            ${comments.map(comment => `
                <li
                    class="comment-item p-4 border-b border-gray-300 flex justify-between items-center"
                    data-text="${comment.text}">
                    <a
                        href="#"
                        onclick="copyComment('${comment.text}'); return false;"
                        class="text-blue-600 font-bold hover:underline flex-grow">
                        <span class="text-gray-600">Line</span> ${comment.line + 1}: 
                        <span class="text-green-500 font-medium">${comment.text}</span>
                    </a>
                </li>
            `).join('')}
        </ul>

        <!-- No Results Found -->
        <div
            id="noResults"
            class="text-gray-600 text-center mt-6 hidden">
            No comments found for your search.
        </div>
    </body>
    </html>`;
}
