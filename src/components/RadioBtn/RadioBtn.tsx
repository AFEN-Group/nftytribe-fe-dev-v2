import style from './RadioBtn.module.scss'

const AcceptBtn = () => {
    return (
        <>

            <div className={style.pbRadio}>
                <input type="radio" name="export" value="email" />
                <span className={style.checkmark}></span>
            </div>
        </>
    );
};

export default AcceptBtn;
