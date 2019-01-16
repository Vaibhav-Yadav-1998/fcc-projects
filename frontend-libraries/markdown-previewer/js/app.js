const markdown = marked;

markdown.setOptions({ breaks: true });

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

const parse = () => (preview.innerHTML = markdown(editor.value));

editor.addEventListener("input", parse);

const onLoad = () => {
  const content = `# Heading

## Sub Heading
  
\` <input type="text" > \`

\`\`\`
 function greet(name = "World") {
   return "Hello " + name;
 }
\`\`\`
  
### Web Technologies
- **HTML**
- **CSS**
- **JavaScript**

> ***“Never stop learning,
because life never stops teaching.”***

![freecodecamp](https://tinyurl.com/ybteg65g)

visit **[FreeCodeCamp](https://freecodecamp.org)**

`;

  editor.value = content;
  parse();
};

document.addEventListener("DOMContentLoaded", onLoad);

const addAtrr = () => {
  preview.querySelectorAll("a").forEach(a => {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  preview.querySelectorAll("blockquote").forEach(b => {
    b.classList.add("blockquote");
  });
};

setTimeout(addAtrr, 1000);
