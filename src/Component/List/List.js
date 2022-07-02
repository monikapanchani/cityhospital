import React from 'react';
import{Card,CardBody,CardTitle,CardSubtitle,CardText,Button} from 'reactstrap'



function List({data}) {

    const dataId =(o)=>{
        console.log(o.id);
    }
    return (
        <div>
                
            {
                data.map((o, i) => {
                  return(
                    <Card>
                    <CardBody>
                        <CardTitle tag="h5">
                         {o.name}
                        </CardTitle>
                        <CardSubtitle className="mb-2" tag="h6" >
                           
                        </CardSubtitle>
                        <CardText>
                        {o.quantity}
                        </CardText>
                        <CardText>
                        {o.price}
                        </CardText>
                        <CardText>
                        {o.expiry}
                        </CardText>
                        <Button onClick={()=>dataId(o)}>
                            Button
                        </Button>
                    </CardBody>
                </Card>
                  )
                })
            }

        </div>
    
    );
}

export default List;