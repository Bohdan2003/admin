import { useRef } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useCreateStockItemsMutation} from '../../api';
import { store } from "../../store";
import { useDispatch } from 'react-redux';
import { clearFilters } from '../filters/filtersSlice';

import { Error } from '../error/Error';
import { ReactComponent as SaveIcon } from "../../assets/save.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

import "./stockTableCreateItems.scss";

const SUPPORTED_FORMATS = ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";

export const StockTableCreateItems = ({page}) => { 
    const dispatch = useDispatch();
    const inputFileRef = useRef();

    const [ createStockItems, { isLoading, isError, error } ] = useCreateStockItemsMutation();

    const clearForm = (resetForm) => {
        resetForm();
        inputFileRef.current.value = null;
    }
    
    return (
        <Formik
            initialValues={{file: null}}
            validationSchema={yup.object({
                file: yup.mixed()
                        .nullable()
                        .required('Обязательное поле')
                        .test(
                            "FILE_FORMAT",
                            "Выбран файл неверного формата.",
                            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
                        )
            })}
            onSubmit={(values, { setFieldError, resetForm }) => {
                const filters = store.getState().filters.stockAdd.values;
                if(!filters.category) {
                    setFieldError("file", "Выбирете категорию")
                    setTimeout(() => {
                        setFieldError("file", null);
                    }, 3000)
                } else if(!filters.subcategory) {
                    setFieldError("file", "Выбирете подкатегорию")
                    setTimeout(() => {
                        setFieldError("file", null);
                    }, 3000)
                } else {
                    const formData = new FormData();     
                    formData.append("file", values.file);

                    formData.append("category", filters.subcategory);

                    createStockItems(formData).unwrap()
                    .then(res => {
                        clearForm(resetForm);
                        dispatch(clearFilters(page));
                    })
                    .catch(err => {
                        console.log(err);
                    }) 
                }
            }}
        >
            {({ values, errors, setFieldValue, resetForm }) => (
                <Form className={`create-items 
                    ${
                        isLoading 
                        ? 'create-items--disabled'
                        : ''
                    }
                    `}
                >
                    <div className="create-items__field">
                        <button className="create-items__field-btn" 
                                onClick={() => {
                                    inputFileRef.current.click();
                                }}
                                type="button"
                        >Выбрать файл</button>
                        <input className="create-items__field-input"
                                ref={inputFileRef}
                                type="file"
                                onChange={(e) => {
                                    if(e.target.files[0]) setFieldValue("file", e.target.files[0])                               
                                }}
                                accept={SUPPORTED_FORMATS}
                                hidden
                        />
                    </div>
                    <div className={`create-items__btns
                            ${
                                values.file && !isError
                                ? 'create-items__btns--visible'
                                : ''
                            }
                        `}
                    >
                        <button className="create-items__btn-save" 
                                type="submit"
                        ><SaveIcon/></button>
                        <button className="create-items__btn-cancel" 
                                type="button"
                                onClick={() => {
                                    clearForm(resetForm);
                                }}
                        ><DeleteIcon/></button>

                    </div>
                    { isError && <Error error={error}/> }
                    {errors.file && <div className="create-items__error">{errors.file}</div>}
                </Form>
            )}
        </Formik>
    )
}