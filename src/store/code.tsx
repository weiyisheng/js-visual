import create from 'zustand'


interface CodeStore {
    textual: string,
    setTextual: (texttual: string) => void
}


export default create<CodeStore>(set => ({
    textual: '',
    setTextual: (textual: string) => set(state => ({ textual })),
    ast: null
}))