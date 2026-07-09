

export default function ListCard({name, imgSrc, onClick}){
    return(
        <figure className="grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 " onClick={() => {onClick}}>
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