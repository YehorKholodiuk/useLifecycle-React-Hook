import { useRef, useEffect } from 'react'
import { useLifecycle } from '@react-custom-hooks/use-lifecycle'
import { BaseComponent } from './base-component'

export const CoolComponent = ({
                                  children,
                                  className,
                                  lifecycle: { onMount, onRender } = {},
                                  ...props
                              }) => {
    const ref = useRef()
    props.lifecycle = useLifecycle({ onMount })

    props.lifecycle.onMount = (element) => {
        ref.current = element
        console.log('[CoolComponent]: onMount()')

        return () => console.log('[CoolComponent]: onUnmount()')
    }

    useEffect(() => {
        onRender?.(ref.current)
    })

    return (
        <BaseComponent
            className={['CoolComponent', className].join(' ')}
            {...props}
        >
            {children}
        </BaseComponent>
    )
}