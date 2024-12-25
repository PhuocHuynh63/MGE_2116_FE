import mgeService from "@/apiRequests/mge";
import HomePage from "@/containers/Home";
import { IMGE } from "@/shemaValidations/model.schema";

const Home = async () => {
  const mgeResponse = await mgeService.getMge(1, 5) as IMGE;

  return (
    <>
      <HomePage
        data={mgeResponse}
      />
    </>
  );
}

export default Home;
