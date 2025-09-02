import {
    Typography,
    Card,
    CardBody,
  } from "./Interface";
  

  export function Feature( icon, title, children ) {
    return (
      <Card color="white" shadow={true}>
        <CardBody className="grid justify-start">
          <div className="mb-4 grid h-12 w-12 place-content-center rounded-lg bg-blue-600 p-2.5 text-left text-white">
            {icon}
          </div>
          <Typography variant="h5" color="black" className="mb-2">
            {title}
          </Typography>
          <Typography className="font-normal !text-black">
            {children}
          </Typography>
        </CardBody>
      </Card>
    );
  }

  export default Feature;
  