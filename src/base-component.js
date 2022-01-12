import { useRef, useEffect } from 'react'

/*
 *	All app components supposedly inherits this component
 */
export const BaseComponent = ({
                                  children,
                                  className,
                                  lifecycle: { onMount } = {},
                                  ...props
                              }) => {
    const ref = useRef()

    useEffect(() => {
        const onUnmount = onMount?.(ref.current)
        return onUnmount
    }, [])

    return (
        <div
            ref={ref}
            className={['BaseComponent', className].join(' ')}
            {...props}
        >
            {children}
        </div>
    )
}