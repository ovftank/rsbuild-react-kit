import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { readFile, unlink, writeFile } from 'fs/promises';
import { glob } from 'glob';
import JScrewIt from 'jscrewit';
import path, { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig, Plugin } from 'vite';

interface BuildFileContent {
	path: string;
	content: string;
}
const BUILD_FILES: BuildFileContent[] = [
	{
		path: '_redirects',
		content: '/*    /index.html    200',
	},
	{
		path: '.htaccess',
		content: `<IfModule mod_rewrite.c>\n\tRewriteEngine On\n\tRewriteBase /\n\tRewriteCond %{REQUEST_FILENAME} !-f\n\tRewriteCond %{REQUEST_FILENAME} !-d\n\tRewriteRule ^ index.html [L]\n</IfModule>`,
	},
];
const convertToUnicode = (input: string): string => {
	return input
		.split('')
		.map((char) => {
			const hexVal = char.charCodeAt(0).toString(16);
			return `\\u${('000' + hexVal).slice(-4)}`;
		})
		.join('');
};

const generateRandomName = (): string =>
	Math.random().toString(36).substring(7);
const createBuildFilesPlugin = (): Plugin => ({
	name: 'create-build-files',
	apply: 'build',
	closeBundle: async () => {
		try {
			await Promise.all(
				BUILD_FILES.map(async ({ path: filePath, content }) => {
					const fullPath = resolve(__dirname, 'dist', filePath);
					await writeFile(fullPath, content);
				}),
			);
		} catch (err) {
			console.error('Error creating build files:', err);
		}
	},
});

const obfuscateFilesPlugin = (): Plugin => ({
	name: 'obfuscate-files',
	apply: 'build',
	closeBundle: async () => {
		try {
			const indexPath = resolve(__dirname, 'dist', 'index.html');
			let htmlData = await readFile(indexPath, 'utf8');

			htmlData = htmlData.replace(
				/<link[^>]*rel="stylesheet"[^>]*>/g,
				'',
			);
			const cssFiles = await glob('dist/assets/*.css');
			const allCss = await cssFiles.reduce(
				async (promisedAcc, cssFile) => {
					const acc = await promisedAcc;
					const content = await readFile(cssFile, 'utf8');
					await unlink(cssFile);
					return acc + content;
				},
				Promise.resolve(''),
			);

			const encodedHtml = convertToUnicode(htmlData);
			const encodedCss = convertToUnicode(allCss);

			const injectScript = `
				(function() {
					const style = document.createElement('style');
					style.textContent = '${encodedCss}';
					document.head.appendChild(style);
					document.write('${encodedHtml}');
				})();
			`;

			const jsfuckCode = JScrewIt.encode(injectScript);
			const finalHtml = `<script type="text/javascript">${jsfuckCode}</script>`;

			await writeFile(indexPath, finalHtml);
		} catch (err) {
			console.error('Error encoding files:', err);
		}
	},
});

export default defineConfig({
	plugins: [react(), createBuildFilesPlugin(), obfuscateFilesPlugin()],

	build: {
		emptyOutDir: true,
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					const info = assetInfo.source
						? assetInfo
						: assetInfo.type === 'asset'
							? assetInfo
							: { names: [] };
					const ext = info.names?.[0]?.split('.').pop() ?? 'js';
					return `assets/${generateRandomName()}.${ext}`;
				},
				chunkFileNames: () => `assets/${generateRandomName()}.js`,
				entryFileNames: () => `assets/${generateRandomName()}.js`,
			},
		},
	},

	server: {
		host: '0.0.0.0',
		proxy: {
			'/api': 'http://localhost:3000',
		},
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},

	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},
});
