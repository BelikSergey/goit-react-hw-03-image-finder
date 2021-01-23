import PropTypes from 'prop-types';
import{ Component } from 'react'
import ImageGalleryItem from '../ImageGalleryItem';
// import axios from 'axios';
import pixabayApi from '../../services'

export default class ImageGallery extends Component {
    state={
        search:'',
        page:'1',
        gallery: null,
    }
    
    async componentDidUpdate(prevProps, prevState) {
        // console.log('компонент обновился');
        const prev = prevProps.search;
        const next = this.props.search;
        // console.log(prev);
        

        if(prev !== next){
            // console.log('сработало обновление ImageGallery');
        //    const data = await axios(`https://pixabay.com/api/?q=${next}&page=${this.state.page}&key=19207459-7123426cd96bb4a7307e45de7&image_type=photo&orientation=horizontal&per_page=12`);
            const data = await pixabayApi(next,this.state.page);
            this.setState((prevState)=>({
                gallery: data.data.hits
            }))
            console.log(this.state.gallery);
        }
    }
    
   

    render() {
     const {gallery} = this.state;
        return (
            <ul className="ImageGallery">
            {gallery && gallery.map(({id, webformatURL, tags })=>(
                <ImageGalleryItem key={id} id={id} 
                webformatURL={webformatURL}
                alt={tags} />
                
            ))}
            
            </ul> 
        )
    }
}


ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,
    id:PropTypes.number.isRequired,
}

ImageGallery.defaultProps={
    id: 0,

}








