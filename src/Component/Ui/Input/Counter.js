
import classes from '../UiStyle.module.css'
const Counter = (props) => {
    return (
        <section className={!props.disable ? classes.numerik : classes[`numerik-disable`]} style={{ marginTop: " 14px" }}>
            <button className={!props.disable ? classes[`btn-numerik-right`] : classes[`btn-numerik-right-disable`]}
                onClick={() => props.handleAmountClick("minus")}
                disabled={props.disable}
            >
                -
            </button>
            <input readOnly
                value={props.amount}
                disabled={props.disable}
                className={classes[`input-numerik`]} type="text" maxLength="2" size="1" />
            <button className={!props.disable ? classes[`btn-numerik-left`] : classes[`btn-numerik-left-disable`]}
                onClick={() => props.handleAmountClick("add")}
                disabled={props.disable}
            >
                +
            </button>
        </section>
    )
}
export default Counter