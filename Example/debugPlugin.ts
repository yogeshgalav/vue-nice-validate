type TConfigResolved = (config: ResolvedConfig) => void | Promise<void>;
type plugin = { 
	name: string,
	configResolved: TConfigResolved, 
	transform: (code: string, id: string) => string | false 
};
function formatFuncArgs(args: string){
	return args
	.replace(/"/g,"'")
	.split(',').map(el=>{
		el = el.includes('=') ? el.split('=')[0] : el;
		el = `['object','function'].includes(typeof ${el}) ? '${el}' : ${el}`;
		return el;
	}).join(',');
}

export default function viteDebugPlugin(include_path?:string|Array<string> ): plugin {
	let config;
	return {
	  name: 'vite-debug-plugin',

	  configResolved(resolvedConfig) {
		// store the resolved config
		config = resolvedConfig
	  },

	  transform(code: string, id: string) {
		if (config.command !== 'serve') {
			return false;
		}
		if(id.includes('node_modules')){
			return false;
		}
		if(typeof include_path === 'string' && !id.includes(include_path)){
			return false;
		}
		if(Array.isArray(include_path) && !include_path.some(el=>id.includes(el))){
			return false;
		}

		const updatedCode = code
		.replace(
			/(export\s+)?function\s+(\w+)\s*\(([^)]*)\)\s*\{/g,
			(match: string, exportKeyword: string, funcDeclaration: string, funArgs: string) => {
				let args = '';
				if(funArgs){
					args = `"(",`+formatFuncArgs(funArgs)+`,")"`;
				}
			  return match + `console.log("function call: ${funcDeclaration}",${args});`;
		})
		.replace(
			/},\s*\b(\w+)\s*\(([^)]*)\)\s*\{/g,
			(match: string, funcDeclaration: string, funArgs: string) => {
				let args = '';
				if(funArgs){
					args = formatFuncArgs(funArgs);
				}
			  return match + `console.log("function call: ${funcDeclaration}",${args});`;
			}
		);
		return updatedCode;
	  },
	};
  }
  