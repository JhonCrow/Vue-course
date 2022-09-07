import { shallowMount, mount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe('Indecision component', ()=>{
    let wrapper;
    let clgSpy;
    global.fetch = jest.fn(()=>Promise.resolve({
        json:()=>Promise.resolve({
            answer: 'yes',
            forced: false,
            image:'https://tesno.wtf/assetyes/2.gif'
        })
    }))
    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        clgSpy = jest.spyOn(console, 'log');
        jest.clearAllMocks()
    })

    test('Debe de ahcer match con el snapshot', ()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('escribir en el input no debe disparar nada (console.log)', async ()=>{
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
        const input = wrapper.find('input')
        await input.setValue('Hola Mundo')
        expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).not.toHaveBeenCalled()
    })

    test('escribirel simbolo de "?" debe disparar el getAnswer', async ()=>{
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
        const input = wrapper.find('input')
        await input.setValue('Hola Mundo?')
        expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).toHaveBeenCalled()
    })

    test('pruebas en geAnswer', async ()=>{
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://tesno.wtf/assetyes/2.gif')
        expect(wrapper.vm.answer).toBe('Si')

    })

    test('pruebas en geAnswer - fallo en el API', async()=>{
        fetch.mockImplementationOnce(()=> Promise.reject('API is down'))
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe('No se pudo cargar el API')
    })
})




