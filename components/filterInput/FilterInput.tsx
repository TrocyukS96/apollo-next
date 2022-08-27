import React, {ChangeEvent, useState} from 'react';
import {ParamsType} from "../../types";
import {Button, Input} from "@mui/material";
import s from './styles.module.scss';

interface IProps{
    params:ParamsType
    setParams:(param:ParamsType)=>void
}

const FilterInput = ({params,setParams}:IProps) => {
    const [searchInput,setSearchInput] = useState(params.filter)
    const searchInputHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setSearchInput(e.currentTarget.value)
    }
    const searchBtnHandler = async ()=>{
        setParams({...params, filter:searchInput})
    }
    return (
        <div className={s.searchBlock}>
            <Input type="text"
                       onChange={searchInputHandler}
                       placeholder={'add the text'}
                       className={s.searchInput}
                   color={'primary'}
                   sx={{border:'2px solid'}}
                   value={searchInput}
            />
            <Button onClick={searchBtnHandler}
                    variant={'contained'}
            >search link</Button>
        </div>
    );
};

export default FilterInput;