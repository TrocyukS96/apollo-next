

interface GuardProps {
    children: JSX.Element;
    excludedRoutes?: string[];
}

const Guard = ({children,excludedRoutes}:GuardProps)=>{
return(<>{children}</>)
}

export default Guard;