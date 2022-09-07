import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter component", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Counter);
    })
    /*   test("Debe hacer match con el snapshot", () => {
        const wrapper = shallowMount(Counter);
        expect(wrapper.html()).toMatchInlineSnapshot(`
          <h1>Counter</h1>
          <p>100 <sup>2</sup> = 10000</p>
          <div><button>+1</button><button>-1</button></div>
        `);
      }); */

    test('h2 debe tener el valor por defecto "Counter', () => {
        expect(wrapper.find('h1').exists()).toBeTruthy()
        const h1Value = wrapper.find('h1').text();
        expect(h1Value).toBe('Counter!')
    })

    test('El valor por defecto debe de ser 100 en el p', () => {
        const value = wrapper.find('[data-tstid="counter"]').text();
        expect(value).toBe('100')
    })

    test('Debe incrementar en 1', async () => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        const value = wrapper.find('[data-tstid="counter"]').text();
        expect(value).toBe('101')
    })

    test('Debe de establecer el valor por defecto', ()=>{
        const { start} = wrapper.props()
        const value = wrapper.find('[data-tstid="counter"]').text()
        expect(Number(value)).toBe(start)
    })

    test('Debe de mostrar la props title', ()=>{
        const wrapper = shallowMount(Counter, {
            props:{
                title:'Hola Mundo'
            }
        });
        expect(wrapper.find('h1').text()).toBe('Hola Mundo')
    })
});
