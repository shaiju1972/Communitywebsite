// react
import React, { useState, useEffect, useContext } from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import dynamic from 'next/dynamic'
import { useFormContext } from 'react-hook-form';
import {usePropertiesForm} from '~/services/forms/properties'
import { getCategories, getLocations } from '~/store/user/userAction'
import {addProperties} from '~/store/properties/propertiesActions';

import Map from '~/components/google-map/Map';
// import GoogleMapReact from 'google-map-react';
import DatePicker from "react-datepicker";

const formTemplate = {
    name:'',
    description:'',
    categoryId:'',
    price:'',
    noOfRooms:'',
    noOfBathrooms:'',
    furnitureStatus:'',
    contactName:'',
    contactNumber:'',
    contactTimeFrom:'',
    contactTimeTo:'',
    commissionRequired:'0',
    commissionAmount:'0',
    depositRequired:'',
    depositAmount:'0',
    lat:'',
    lng:'',
    locationCode:'',
    locationName:'',
    addressString:'Test'
};
const RichTextEditor = dynamic(
  () => import('~/components/text-editor/TextEditor'),
  { ssr: false }
)

// application
import AppImage from '~/components/shared/AppImage';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/services/url';
import AccountLayout from '~/components/account/AccountLayout';
import ProductForm from '~/components/shop/ProductForm';
import { useForm, Controller } from "react-hook-form";
import {useSelector, useDispatch} from 'react-redux'
// import TextEditor from '~/components/text-editor/TextEditor'

function Page() {
    const intl = useIntl();
    const dispatch = useDispatch()
    // const { register } = useFormContext();
    const getCategoriesList = React.useCallback(()=> dispatch(getCategories()),[dispatch])
    const getLocationsList = React.useCallback(()=> dispatch(getLocations()),[dispatch])
    const { register, errors, handleSubmit, getValues, control } = useForm();
    const categoriesList = useSelector(store => store['user']?.propertyCategories);
    const locationList = useSelector(store => store['user']?.locations);
    const userMeta = useSelector(store => store['user']?.current)
    const addPropery = React.useCallback((e)=> dispatch(addProperties(e)),[dispatch])
    const[uploadImages, setImages]=useState([]);
    const[propertyImage, setPropertyImage]=useState([])
    const furnitureStatus = [
        {name :'Furnished', status : 1},
        {name :'Semi-Furnished', status : 2},
        {name :'Unfurnished', status : 3}
        ];
    
    const [mapOptions, setMapOPtions] = useState({
    center: {
      lat:24.343175,
      lng: 54.405406
    },
    zoom: 11
  });
 
    useEffect(()=>{
        getCategoriesList();
        getLocationsList()
    },[]);


    useEffect(()=>{
        if(userMeta){
            const _form = {...form}
            _form.contactName = userMeta?.name;
            _form.contactNumber = userMeta?.mobile;
            setForm(_form);
        }
    },[userMeta]);

    const[form, setForm]= useState({
        name:'',
        description:'',
        categoryId:'',
        price:'',
        noOfRooms:'',
        noOfBathrooms:'',
        furnitureStatus:'',
        contactName:'',
        contactNumber:'',
        contactTimeFrom:'',
        contactTimeTo:'',
        commissionRequired:'0',
        commissionAmount:'0',
        depositRequired:'',
        depositAmount:'0',
        locationCode:'',
        locationName:'',
        lat:'',
        lng:'',
        addressString:''
    });

    const handleDescription=e=>{
        const _form = {...form};
        _form.description = e;
        setForm(_form)
    }

    const onSubmit=async formData =>{
        const _form = {...form};
        _form.contactTimeFrom = new Date(form.contactTimeFrom).toLocaleTimeString();
        _form.contactTimeTo = new Date(form.contactTimeTo).toLocaleTimeString();
        
        const payload = {..._form, ...{image: propertyImage}}
        const response:any = await addPropery(payload)
        if(response?.data?.status){
            setForm(formTemplate)
            setImages([])
            setPropertyImage([])
        }
        // console.log(response)

    }

    const handleMapClick=(data)=>{
        const {lat, lng} = data;
        const _state = {...form};
        _state.lat = lat;
        _state.lng = lng;        
        setForm(_state);
        const options = {...mapOptions};
        options.center.lat = lat;
        options.center.lng = lng;

        setMapOPtions(options)
    }

    const handleFileChange=(e)=>{
        const file = e.target.files[0];
        imagePreview(file);
        const imageList = [...propertyImage, file];
        setPropertyImage(imageList);
    }

    const imagePreview=(image)=>{
        const reader = new FileReader();
        if(image) {
        reader.readAsDataURL(image);
        reader.onload = () => { 
            const _images = [...uploadImages, {image:reader.result, name: image.name}];
                setImages(_images)
        };
        }
    }

    const removeImage = (image)=>{
        const _propertyImage = [...propertyImage];
        const updatedList = _propertyImage.filter(i => (i.name != image));
        setPropertyImage(updatedList)
        const _uploadImages = [...uploadImages];
        const _updateList = _uploadImages.filter(i => (i.name != image)) 
        setImages(_updateList)
    }

    const updateTime=(time, key)=>{
        const _form ={...form};
        _form[key]= new Date(time).getTime();
        setForm(_form)
    }

    const handleInputChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        const _form = {...form};
        if(name == 'locationurl'){
            const mapCords = value;
            if(mapCords){
                const cords = mapCords.split('@')[1].split(',');
                _form.lat = cords[0];
                _form.lng = cords[1];
            }
            return false;
        }
        _form[name]=value;
        if(name == 'locationName'){
            let code;
            locationList.forEach(i => {
                if(i.name == value){
                    code = i.code
                }
            });
            _form['locationCode'] = code;
        }
        setForm(_form)
    }
    const handleAddressChange=e =>{
        const _form = {...form};
        _form.lat = e.lat;
        _form.lng = e.lng;
        _form.addressString = e.address;
        setForm(_form)
    }    

    return (
        <div className="card">
            <PageTitle>{intl.formatMessage({ id: 'TEXT_PROPERTIES' })}</PageTitle>
            <div className="card-header">
                <h5><FormattedMessage id="HEADER_ADD_PROPERTIES" /></h5>
            </div>
            <div className="card-divider" />
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body card-body--padding--2">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                         <div className="form-group">
                            <label htmlFor="property-name">
                                 <FormattedMessage id="PROPERTY_NAME" />
                            </label>
                            <input
                                id="property-name"
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={handleInputChange}
                                value={form.name}
                                placeholder={intl.formatMessage({ id: "PROPERTY_NAME"})}
                                ref={register({ required: true })}
                            />
                            { errors.name &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="choose-category">
                                <FormattedMessage id="LABEL_CHOOSE_CATEGORY" />
                            </label>
                            <select id="choose-category" className="form-control" placeholder={intl.formatMessage({ id: "LABEL_CHOOSE_CATEGORY"})} name="categoryId"
                            onChange={handleInputChange}
                            ref={register({ required: true })}  value={form.categoryId}>

                                <option value="">Select</option>
                                {categoriesList && categoriesList.length > 0 &&
                                    categoriesList.map((item =>(
                                        <option key={item.code} value={item.code}>
                                            {item.name}
                                        </option>
                                    )))
                                }
                            </select>
                             { errors.categoryId &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label htmlFor="description">
                                <FormattedMessage id="TEXT_TAB_DESCRIPTION"/>
                            </label>                            
                                <RichTextEditor getContent={handleDescription} />
                            {/* <TextEditor getContent={e => console.log(e)} /> */}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label htmlFor="price-range">
                                <FormattedMessage id="LABEL_PRICE_RANGE" />
                            </label>
                            <input
                                id="price-range"
                                type="text"
                                className="form-control"
                                name="price"
                                placeholder={intl.formatMessage({ id: "TEXT_PRICE_RANGE_FROM"})}
                                ref={register({ required: true })}
                                onChange={handleInputChange}
                                value={form.price}
                            />
                             { errors.price &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    <div className="col-lg-6">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_STATUS_OF_FURNITURE" />
                            </label>
                            <select name="furnitureStatus" className="form-control" placeholder={intl.formatMessage({ id: "LABEL_STATUS_OF_FURNITURE"})}
                            onChange={handleInputChange}
                             ref={register({ required: true })}
                             value={form.furnitureStatus}
                             >
                                <option value="">Select</option>
                                {
                                    furnitureStatus.map(status=>(
                                        <option value={status.status} key={status.status}>{status.name}</option>
                                    ))
                                }
                            </select>
                             { errors.furnitureStatus &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_NUMBER_OF_BATHROOMS" />
                            </label>
                            <input
                                id="price-range"
                                type="text"
                                name="noOfBathrooms"
                                className="form-control"
                                placeholder={intl.formatMessage({ id: "LABEL_NUMBER_OF_BATHROOMS"})}
                                ref={register({ required: true })}
                                onChange={handleInputChange}
                                value={form.noOfBathrooms}
                            />
                            { errors.noOfBathrooms &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                     <div className="col-lg-3 col-md-3 col-sm-12">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_NUMBER_OF_ROOMS" />
                            </label>
                            <input
                                id="price-range"
                                type="text"
                                name="noOfRooms"
                                className="form-control"
                                placeholder={intl.formatMessage({ id: "LABEL_NUMBER_OF_ROOMS"})}
                                ref={register({ required: true })}
                                onChange={handleInputChange}
                             value={form.noOfRooms}

                            />
                             { errors.noOfRooms &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_LOCATION_NAME" />
                            </label>
                            
                            <select name="locationName" className="form-control" placeholder={intl.formatMessage({ id: "LABEL_STATUS_OF_FURNITURE"})}
                            onChange={handleInputChange}
                            value={form.locationName}
                             ref={register({ required: true })}>
                                <option value="">Select</option>
                                {
                                    locationList && locationList.map((location, index)=>(
                                        <option value={location.name} key={index}>{location.name}</option>
                                    ))
                                }
                            </select>
                             { errors.locationName &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>

                    <div className={`${parseInt(form.commissionRequired) == 1 ?'col-lg-3':'col-lg-6'}`}>
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_COMMISSION_STATUS" />
                            </label>
                            <select className="form-control" name="commissionRequired" placeholder={intl.formatMessage({ id: "LABEL_COMMISSION_STATUS_PLACEHOLDER"})}
                            value={form.commissionRequired}
                             onChange={handleInputChange}
                            ref={register({ required: true })}>
                                <option value="">Select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                            { errors.commissionRequired &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    {
                        parseInt(form.commissionRequired) == 1 && <div className="col-lg-3">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_COMMISSION_AMOUNT" />
                            </label>
                            <input
                                id="price-range"
                                type="text"
                                name="commissionAmount"
                                className="form-control"
                                value={form.commissionAmount}
                                placeholder={intl.formatMessage({ id: "LABEL_COMMISSION_AMOUNT_PLACEHOLDER"})}
                                ref={register({ validate: value => {
                                    if(!value && parseInt(getValues('commissionRequired')) == 1) return true
                                } })}
                                onChange={handleInputChange}
                            />
                             { errors.commissionAmount &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>}
                    <div className={`${parseInt(form.depositRequired) == 1? 'col-lg-3': 'col-lg-6'}`}>
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_DEPOSIT_STATUS" />
                            </label>
                            <select name="depositRequired" className="form-control"
                            onChange={handleInputChange}
                             value={form.depositRequired}
                            ref={register({ required: true })}>
                                <option value="">Select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                            { errors.depositRequired &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    {
                        parseInt(form.depositRequired) == 1 && <div className="col-lg-3">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_DEPOSIT_AMOUNT" />
                            </label>
                            <input
                                id="price-range"
                                type="text"
                                name="depositAmount"
                                value={form.depositAmount}
                                className="form-control"
                                placeholder={intl.formatMessage({ id: "LABEL_DEPOSIT_AMOUNT_PLACEHOLDER"})}
                                ref={register({ validate: value => {
                                    if(!value && parseInt(getValues('depositRequired')) == 1) return true
                                } })}
                                onChange={handleInputChange}
                            />
                             { errors.depositAmount &&( <span className="form-error"><FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>}
                    <div className="col-lg-3">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_CONTACT_NUMBER" />
                            </label>
                            <input
                                id="price-range"
                                type="text"
                                name="contactNumber"
                                 value={form.contactNumber}
                                className="form-control"
                                placeholder={intl.formatMessage({ id: "LABEL_CONTACT_NUMBER_PLACEHOLDER"})}
                                ref={register({ required : true})}
                                onChange={handleInputChange}
                            />
                             { errors.contactNumber &&( <span className="form-error">
                                 <FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    <div className="col-lg-3">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_CONTACT_NAME" />
                            </label>
                            <input
                                id="price-range"
                                type="text"
                                value={form.contactName}
                                name="contactName"
                                className="form-control"
                                placeholder={intl.formatMessage({ id: "LABEL_CONTACT_NAME_PLACEHOLDER"})}
                                ref={register({ required:true })}
                                onChange={handleInputChange}
                            />
                             { errors.contactName &&( <span className="form-error">
                                 <FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    <div className="col-lg-3">
                         <div className="form-group">
                             <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_FROM_TIME" />
                            </label>
                            <DatePicker
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat="HH:mm a"
                                timeIntervals={15}
                                dateFormat="h:mm aa"
                                selected={form.contactTimeFrom}
                                onChange={e => updateTime(e, 'contactTimeFrom')}
                                className="form-control"
                            />
                            
                             { errors.contactTimeFrom &&( <span className="form-error">
                                 <FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    <div className="col-lg-3">
                         <div className="form-group">
                             <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_TO_TIME" />
                            </label>
                            <DatePicker
                                className="form-control"
                                showTimeSelect
                                timeFormat="HH:mm a"
                                dateFormat="h:mm aa"
                                selected={form.contactTimeTo}
                                name="contactTimeTo"
                                timeIntervals={15}
                                onChange={e => updateTime(e, 'contactTimeTo')}
                                showTimeSelectOnly
                            />
                             { errors.contactTimeTo &&( <span className="form-error">
                                 <FormattedMessage id="ERROR_FORM_REQUIRED" /></span> ) }
                        </div>
                    </div>
                    {/* <div className="col-lg-12">
                         <div className="form-group">
                            <label htmlFor="choose-furniture">
                                <FormattedMessage id="LABEL_LOCATION_MAP_URL" />
                            </label>
                            <input
                                id="price-range"
                                type="text"
                                // value={form.locationurl}
                                className="form-control"
                                name="locationurl"
                                placeholder={intl.formatMessage({ id: "LABEL_LOCATION_MAP_URL_PLACEHOLDER"})}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div> */}
                    
                    <div className="col-lg-12">
                         <div className="form-group" style={{height:'355px'}}>
                             <Map 
                                center={{lat: 18.5204, lng: 73.8567}}
                                height='300px'
                                zoom={15}
                                setAddress={handleAddressChange}
                            />
                            {/* <GoogleMapReact
                                bootstrapURLKeys={{ key:process.env.GOOGLE_MAP_API_KEY || '' }}
                                defaultCenter={mapOptions.center}
                                defaultZoom={mapOptions.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onClick={handleMapClick}
                                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                                >
                                    <MapMarker text={'Here'} />
                            </GoogleMapReact> */}
                        </div>
                    </div>
                    <div className="col-lg-12">
                         <div className="form-group image-upload">
                            <label htmlFor="upload-image">
                                <FormattedMessage id="LABEL_ADD_IMAGES" />
                            </label>
                            <div className="image-container">
                                {
                                    uploadImages.length > 0 && uploadImages.map((image, index)=>(
                                        <div className="properties-image" key={index}>
                                            <img src={image.image} height="120px" />
                                            <div className="image-icons">
                                                <span className="close" onClick={()=> removeImage(image.name)}>
                                                    <svg  width="25px" height="25px" fill="#000" viewBox="0 0 512 512" >
                                                            <path d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257s255-116.39,255-257S397.61,0,257,0z M383.22,338.79
                                                                c11.7,11.7,11.7,30.73,0,42.44c-11.61,11.6-30.64,11.79-42.44,0L257,297.42l-85.79,83.82c-11.7,11.7-30.73,11.7-42.44,0
                                                                c-11.7-11.7-11.7-30.73,0-42.44l83.8-83.8l-83.8-83.8c-11.7-11.71-11.7-30.74,0-42.44c11.71-11.7,30.74-11.7,42.44,0L257,212.58
                                                                l83.78-83.82c11.68-11.68,30.71-11.72,42.44,0c11.7,11.7,11.7,30.73,0,42.44l-83.8,83.8L383.22,338.79z"/>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            <label htmlFor="choose_image" className="select-image">Upload Image</label>
                            <input type="file" id="choose_image" accept="image/jpeg, image/png" onChange={handleFileChange} hidden/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>   
                <div className="col-lg-12">
                    <div className="form-group">
                        <button
                            type="submit"
                            className={classNames('btn', 'btn-primary', 'mt-3', 
                            )
                        }
                        >
                            <FormattedMessage id="BUTTON_SAVE" />
                        </button>
                    </div> 
                </div> 
            </form>
        </div>
    );
}
Page.Layout = AccountLayout;

export default Page;
