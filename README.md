# PDF Splitter React App 🐱✂️

## 🌐   https://nina-mir.github.io/pdf-splitter

Welcome to the **PDF Splitter** React application! This project lets you **drag-and-drop** (or click to upload) a PDF file, immediately extracts metadata, and splits it into multiple parts — **all within your browser** (no server needed) and on both Mobile screen 📱 and larger screens 🖥️.

## How It Works

1. **Upload a PDF** via drag-and-drop or by clicking the dropzone.
2. **See Metadata**: The app immediately loads and displays PDF info (title, author, page count, etc.).
3. **Choose Split Method**: Provide either the number of splits or pages per split.
4. **Split & Download**: The PDF is chopped into separate files, optionally zipped together, and downloaded.

## Design Fun😸

This project's UI is inspired by a Helly Kitty color scheme!
<div style="display: flex; gap: 0.25rem; font-size: 1.rem; color: white; text-align: center;">
    <div style="width: 6rem; height: 10rem; background: #f5a3c8;">rouge pink `#f5a3c8`</div>
    <div style="width: 6rem; height: 10rem; background: #ed0d92;">fluorescent pink `#ed0d92`</div>
    <div style="width: 6rem; height: 10rem; background: #0e000a;">glossy black `#0e000a`</div>
    <div style="width: 6rem; height: 10rem; background: #f2f1f2; color: black;">aragonite white `#f2f1f2`</div>
    <div style="width: 6rem; height: 10rem; background: #e9ca01; color: black;">wild honey `#e9ca01`</div>
  </div>

#### source https://color.adobe.com/o-Kitty-Colors-color-theme-6597853/

More info below!

## Why Client-Side Splitting?

By performing the splitting entirely in the browser, you avoid sending files to any external server. This results in:
- **Faster performance** since no network round-trip is required
- **Increased privacy** because PDFs never leave your computer
- **Instant feedback** on file splitting and metadata

## Key Features

- **PDF Upload (Drag & Drop)**  
  Utilizes [`react-dropzone`](https://github.com/react-dropzone/react-dropzone) to handle drag-and-drop upload or manual file browsing.

- **PDF Metadata Extraction**  
  Leveraging [`pdf-lib`](https://github.com/Hopding/pdf-lib) to read PDF author, title, page count, and more.

- **On-the-Fly PDF Splitting**  
  Splitting logic (with [`pdf-lib`](https://github.com/Hopding/pdf-lib)) happens client-side. Chunks are then compressed into a ZIP with [`jszip`](https://stuk.github.io/jszip/) and downloaded via [`file-saver`](https://github.com/eligrey/FileSaver.js).

- **Responsive UI**  
  Built with **React** (and configured via [Vite](https://vitejs.dev/)) for a modern, snappy experience on both desktop and mobile.

## React Libraries Used

- **React**: Core library for building the interface  
- **react-dropzone**: Drag-and-drop file upload  
- **pdf-lib**: PDF parsing and splitting  
- **jszip**: Creating a ZIP file of PDF chunks  
- **file-saver**: Prompt user to download the ZIP  
- (Optional) Additional libraries you have used (like `vite-plugin-svgr`, etc.)

## Running the Project Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nina-mir/pdf-splitter.git
   cd pdf-splitter
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Dev Server**

   ```bash
   npm run dev
   ```
   - Open your browser at the address shown in the terminal (usually **http://localhost:5173**).

4. **Build for Production**

   ```bash
   npm run build
   ```
   - This generates a production-ready build in the `dist/` folder.

5. **Preview Production Build**

   ```bash
   npm run preview
   ```
   - Serves the `dist/` folder locally to test your production setup.


## Contributing

Feel free to **fork** this repo and open **pull requests** for any improvements or additional features. Issues and suggestions are always welcome!

Enjoy your **secure and fast** PDF splitting — all within your browser!


### Appendix CSS code


#### Color Theme Swatches in Hex 

.Hello-Kitty-Colors-1-hex { color: #F5A3C8; }
.Hello-Kitty-Colors-2-hex { color: #ED0D92; }
.Hello-Kitty-Colors-3-hex { color: #0E000A; }
.Hello-Kitty-Colors-4-hex { color: #F2F1F2; }
.Hello-Kitty-Colors-5-hex { color: #E9CA01; }

#### Color Theme Swatches in RGBA

.Hello-Kitty-Colors-1-rgba { color: rgba(244, 163, 200, 1); }
.Hello-Kitty-Colors-2-rgba { color: rgba(237, 13, 145, 1); }
.Hello-Kitty-Colors-3-rgba { color: rgba(14, 0, 10, 1); }
.Hello-Kitty-Colors-4-rgba { color: rgba(242, 240, 242, 1); }
.Hello-Kitty-Colors-5-rgba { color: rgba(232, 202, 1, 1); }

#### Color Theme Swatches in HSLA

.Hello-Kitty-Colors-1-hsla { color: hsla(332, 80, 80, 1); }
.Hello-Kitty-Colors-2-hsla { color: hsla(324, 89, 49, 1); }
.Hello-Kitty-Colors-3-hsla { color: hsla(317, 100, 2, 1); }
.Hello-Kitty-Colors-4-hsla { color: hsla(300, 3, 94, 1); }
.Hello-Kitty-Colors-5-hsla { color: hsla(51, 99, 45, 1); }
