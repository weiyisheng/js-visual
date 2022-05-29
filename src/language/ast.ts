import { parse }  from '@babel/parser'


export function textualToAST(textual: string) {
    return parse(textual)
}