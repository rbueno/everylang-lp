import Image from 'next/image'

const ShiftTextImageSection = ({ headText = '---', bodyText = '--', imageSRC = '/placeholder.svg', textSide = 'left', imageWidth = 300, imageHight = 400 }) => {

  const imageProps = {
    width: imageWidth,
    height: imageHight,
    layout:"cover", 
    placeholder: 'blur',
    blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD" ,
    quality: 100,
    loading: "lazy", 
  }
  const componentTextLeft = <section className="container mx-auto grid grid-cols-1 gap-12 py-16 md:grid-cols-2">
   <div className="order-2 md:order-1">
      <div className="flex flex-col items-start justify-center gap-4">
        <h2 className="text-3xl font-bold text-darkColor">{headText}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {bodyText}
        </p>
      </div>
   </div>

  <div className="order-1 md:order-2">
      <Image
        src={imageSRC}
        alt={`Everylang ${headText}`}
        width={imageProps.width} 
        height={imageProps.height} 
        layout={imageProps.layout}
        placeholder='blur'
        blurDataURL={imageProps.blurDataURL}
        quality={imageProps.quality}
        loading='lazy'
      />
  </div>
</section>

const componentTextRight = <section className="container mx-auto grid grid-cols-1 gap-12 py-16 md:grid-cols-2">

 <Image
     src={imageSRC}
     alt={`Everylang ${headText}`}
     width={imageProps.width} 
     height={imageProps.height} 
     layout={imageProps.layout}
     placeholder='blur'
     blurDataURL={imageProps.blurDataURL}
     quality={imageProps.quality}
     loading='lazy'
  />
<div className="flex flex-col items-start justify-center gap-4">
  <h2 className="text-3xl font-bold text-darkColor">{headText}</h2>
  <p className="text-lg text-gray-600 dark:text-gray-400">
    {bodyText}
  </p>
</div>
</section>

if (textSide === 'left') return componentTextLeft
if (textSide === 'right') return componentTextRight
return <></>
}

export { ShiftTextImageSection }