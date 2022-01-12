//In the following example, BaseComponent is a basic react component that implements onMount() and onUnmount() lifecycles. CoolComponent is a more complex component that wraps around BaseComponent, thus, inheriting its lifecycles. On top of this, CoolComponent also implement an additional lifecycle called onRender(). CoolerComponent is another component layer on top CoolComponent which once again inherits all its lifecycles.
//The user passes lifecycle handlers as props to the CoolerComponent. CoolerComponent then passes these handlers, in addition to its own internal handlers, as props (once again) to CoolComponent. CoolComponent runs onRender(), a lifecycle it manages, and modifies the handlers to the remaining lifecycles, by adding its own handlers, and passes them as props to BaseComponent. The underlying BaseComponent therefore runs all the handlers for onMount() and onUmount() from the 3 levels above, in the order of how ‘close’ they are to BaseComponent.
//After running onMount(), BaseComponent saves the returned value as a ‘lifecycle cleanup’ into the onMount variable. When BaseComponent decides it is time to run the cleanups for this lifecycle, all cleanups are run in reverse order as the run order of the handlers.




import { useRef, useEffect } from 'react'
import { useLifecycle } from '@react-custom-hooks/use-lifecycle'
import { CoolComponent } from './cool-component'

const CoolerComponent = ({
                             children,
                             className,
                             lifecycle: { onMount, onRender } = {},
                             ...props
                         }) => {
    props.lifecycle = useLifecycle({ onMount, onRender })

    props.lifecycle.onMount = (element) => {
        console.log('[CoolerComponent]: onMount()')

        return () => console.log('[CoolerComponent]: onUnmount()')
    }

    props.lifecycle.onRender = (element) => {
        console.log('[CoolerComponent]: onRender()')
    }

    return (
        <CoolComponent
            className={['CoolerComponent', className].join(' ')}
            {...props}
        >
            {children}
        </CoolComponent>
    )
}

export const App = () => {
    const onMount = (element) => {
        console.log('Component was mounted')

        return () => console.log('Component was unmounted')
    }
    const onRender = (element) => {
        console.log('Component was rendered')
    }

    return <CoolerComponent lifecycle={{ onMount, onRender }} />
}
export default App;