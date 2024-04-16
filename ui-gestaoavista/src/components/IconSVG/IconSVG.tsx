
interface IconProps {
    id?: string
    src: string
    alt?: string
    width?: number
    height?: number
    className? : string
    onClick?: (e: any) => void
}

export default function IconSVG(props: IconProps) {
    return (
        <img
            id={props.id}
            src={props.src}
            width={props.width}
            height={props.height}
            className={props.className}
            onClick={props.onClick}
        />
    )
}