import React from 'react'
import FilterRange from '~/components/filters/FilterRange';
import {useSelector, useDispatch} from 'react-redux'
import { getCategories } from '~/store/user/userAction'

const furnitureStatus = [
        {name :'Furnished', status : 1},
        {name :'Semi Furnished', status : 2},
        {name :'Unfurnished', status : 3}
        ];
    
   
    const booleanObj = [
        {name:'Yes', value:1},
        {name:'No', value:0}
    ]


export default function FilterBySearch(props) {
    const dispatch = useDispatch()
    const categoriesList = useSelector(store => store['user']?.propertyCategories);
    const locationList = useSelector(store => store['user']?.locations);
    const getCategoriesList = React.useCallback(()=> dispatch(getCategories()),[dispatch])
    const [filter, setFilter] = React.useState({
        searchKey:'',
        categoryId:'',
        priceFrom:'',
        priceTo:'',
        location:'',
        roomCount:'',
        bathroomCount:'',
        deposit:'',
        furniture:''
    });
    const handleInputChange =(e)=>{
        const key = e.target.name;
        const value = e.target.value;
        const form = {...filter};
        form[key]=value;
        setFilter(form);
    }

    const handleInputRange = e =>{
        const min = e.value[0];
        const max = e.value[1];
        const form = {...filter};
        form.priceFrom = min;
        form.priceTo = max;
        setFilter(form);
    }

    // React.useEffect(()=>{
    //     let timer;
    //     if(props.filterParams && Object.keys(props.filterParams).length){
    //         const _filter = {...filter, ...props.filterParams}
    //         setFilter(_filter)
    //         timer = setTimeout(()=>{
    //             props.filter(_filter)
    //         },100)
    //     }
    //     return ()=>{
    //         clearTimeout(timer);
    //     }
    // },[props.filterParams])

    React.useEffect(()=>{
        getCategoriesList()
    },[]);

    const emitFIlter = ()=>{
        props.filter(filter)
    }
    const resetFilter = ()=>{
        props.filter({})
    }
    return (
        <React.Fragment>
            <div className="card mb-4">
                <div className="card-body card-body--padding--2">
                    <p className="mt-0 mb-2"><strong>Filter By</strong></p>

                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <p className="mt-0 widget-products__prices mb-0">Keyword</p>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Keyword"
                                    name="searchKey"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <p className="mt-0 widget-products__prices mb-0">Category</p>
                                <select className="form-control form-control-sm"
                                    placeholder="Select Salary Range" name="categoryId" value={filter.categoryId}  onChange={handleInputChange}>
                                        <option value="">Select option</option>
                                    {categoriesList && categoriesList.length > 0 &&
                                    categoriesList.map((item =>(
                                        <option key={item.code} value={item.code}>
                                            {item.name}
                                        </option>
                                    )))
                                }
                                </select>
                            </div>
                        </div>


                        <div className="col-sm-3">
                            <div className="form-group">
                                <p className="mt-0 widget-products__prices mb-0">Price</p>
                                <FilterRange
                                    options={{ min:100, max:100000 }}
                                    value={[100, 1500]}
                                    onChangeValue={(e)=>handleInputRange(e)}
                                />
                            </div>
                        </div>

                         <div className="col-sm-3">
                            <div className="form-group">
                                <p className="mt-0 widget-products__prices mb-0">Location</p>
                                <select className="form-control form-control-sm"
                                    placeholder="Select Salary Range" name="location" onChange={handleInputChange}>
                                        <option value="">Select option</option>

                                        {locationList && locationList.map(location =>(
                                            <option key={location.code} value={location.code}>{location.name}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        
                        </div>
                        <div className="row mt-2">
                        
                      

                         <div className="col-sm-2">
                            <div className="form-group">
                                <p className="mt-0 widget-products__prices mb-0">Rooms</p>
                                <input className="form-control form-control-sm"
                                    placeholder="Rooms count" name="roomCount" onChange={handleInputChange} />
                                  
                            </div>
                        </div>

                         <div className="col-sm-2">
                            <div className="form-group">
                                <p className="mt-0 widget-products__prices mb-0">Bathrooms</p>
                                <input className="form-control form-control-sm"
                                    placeholder="Bathroom count" name="bathroomCount" onChange={handleInputChange}/>
                            </div>
                        </div>

                         <div className="col-sm-2">
                            <div className="form-group">
                                <p className="mt-0 widget-products__prices mb-0">Deposit</p>
                                <select className="form-control form-control-sm"
                                    placeholder="Select Salary Range" name="deposit" onChange={handleInputChange}>
                                        <option value="">Select option</option>

                                    {booleanObj.map(opt =>(
                                        <option key={opt.value} value={opt.value}>{opt.name}</option>
                                        ))}
                                </select>
                            </div>
                        </div>

                         <div className="col-sm-2">
                            <div className="form-group">
                                <p className="mt-0 widget-products__prices mb-0">Furniture</p>
                                <select className="form-control form-control-sm"
                                    placeholder="Furniture" name="furniture" onChange={handleInputChange}>
                                        <option value="">Select option</option>

                                    {furnitureStatus.map((item)=>(
                                        <option key={item.status} value={item.status}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-sm-2 m-auto">
                            <div className="form-group">
                                 <p className="m-auto widget-products__prices">. </p>
                                <button type="button" style={{width:'100%'}} className={`btn btn-primary btn-sm`} onClick={()=>emitFIlter()}>Search</button>
                            </div>
                        </div>
                        <div className="col-sm-2 m-auto">
                            <div className="form-group">
                                 <p className="m-auto widget-products__prices">. </p>
                                <button type="button" style={{width:'100%'}} className={`btn btn-primary btn-sm`} onClick={()=>resetFilter()}>Reset</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
