import { Language } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import "./style.scss";
const Lang2 = () => {
    const { search } = useLocation();
    const { lng } = qs.parse(search);
    const languages: { name: string; value: string }[] = [
        {
            name: "English",
            value: "en",
        },
        {
            name: "Chinese",
            value: "zh",
        },
        {
            name: "Spanish",
            value: "es",
        },
        {
            name: "Hindi",
            value: "hi",
        },
        {
            name: "Turkish",
            value: "tr",
        },
    ];

    const [selected, setSelected] = useState(
        lng
            ? languages.filter((data) => data.value === lng && data)[0]
            : { name: "English", value: "en" }
    );
    const [visible, setVisible] = useState(false);
    const [firstTimeLoad, setFirstTimeLoad] = useState(true);

    const handleSetSelected = (data: { name: string; value: string }) => {
        setSelected(data);
        setVisible(!visible);
    };
    useEffect(() => {
        if (!firstTimeLoad) {
            const location = window.location.href;
            console.log(location);
            console.log(search);

            if (search.trim() !== "") {
                window.location.href =
                    window.location.href.split("?")[0] + "?lng=" + selected.value;
            } else {
                window.location.href = window.location.href + "?lng=" + selected.value;
            }
        }
    }, [selected]);
    useEffect(() => {
        setFirstTimeLoad(false);
    }, []);
    return (
        <div className="lang-container">
            <div className="wrap2" onClick={setVisible.bind(this, !visible)}>
                <span>
                    <Language />
                </span>{" "}
                {/* {selected.name || 'Language'} */}
                Language
            </div>
            <div className="options" style={{ height: visible ? 230 : 0 }}>
                {languages.map((data, idx) => (
                    <span className="darkTxt" key={idx} onClick={handleSetSelected.bind(this, data)}>
                        {data.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Lang2;
