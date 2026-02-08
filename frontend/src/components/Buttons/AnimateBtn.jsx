import "./revbtn.css";

const AnimateBtn = (props) => {
    return (
        <div className="link-line">
            <span className="rev-link rev-top text-[12px]">{props.btnName}</span>
            <span className="rev-link text-[12px]">{props.btnName}</span>
        </div>
    )
}

export default AnimateBtn