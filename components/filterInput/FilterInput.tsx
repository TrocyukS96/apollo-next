import React, {ChangeEvent, useState} from 'react';
import {LinkType, ParamsType} from "../../types";
import {useLazyQuery, useQuery} from "@apollo/client";
import {FETCH_LINKS_BY_PARAMS, FETCH_PAGINATION_LINKS} from "../../api/links";
import {Button, Input, TextField} from "@mui/material";
import s from './styles.module.scss';

interface IProps{
    params:ParamsType
    setParams:(param:ParamsType)=>void
}

const FilterInput = ({params,setParams}:IProps) => {
    const [filterData,setFilterData] = useState({filter:''})
    const [searchInput,setSearchInput] = useState('')
    const searchInputHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setSearchInput(e.currentTarget.value)
    }
    const searchBtnHandler = async ()=>{
        setFilterData({filter:searchInput})
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
            />
            <Button onClick={searchBtnHandler}
                    variant={'contained'}
            >search link</Button>
        </div>
    );
};

export default FilterInput;