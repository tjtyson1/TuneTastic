

export default function ListCard({name, imgSrc, function1}){
    
    return(
        <figure className="grid p-2 justify-center m-auto w-56 " onClick={function1}>
            <img 
                loading="lazy"
                src={imgSrc} alt=""
                className="rounded-lg justify-center m-auto "
            />
            <div className="block wrap-normal text-left font-semibold h-6 line-clamp-3 mt-2 ">
             <span className="">
                {name}
            </span>
            </div>
           
       
                    
                        
        </figure>

    )
    
}