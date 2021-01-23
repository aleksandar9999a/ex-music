import React from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'
import './styles.css'

interface IImageUploaderProps {
  src: string,
  onChange: (file: File) => any | void
}

export const ImageUpload = ({ src,  onChange }: IImageUploaderProps) => {
  function handleImageSelect (e: any) {
    const file = e.target.files[0];
    onChange(file);
  }

  return (
    <div className="image-upload">
      {
        src
          ? (
            <div className='image-upload__preview-container'>
              <div className='image-upload__image-box'>
                <img src={src}/>
              </div>
            </div>
          )
          : <FaArrowCircleUp size={70} color="#fff"/>
      }

      <div className='image-upload__input-container'>
        <input type='file' accept='image/*' onChange={handleImageSelect} />
      </div>
    </div>
  )
}
