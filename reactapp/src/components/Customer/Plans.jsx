import PlanItems from "./PlanItems";
// import "./Plans.css";

const Plans = (plans) => {
  return (
    <div>
      {plans.items.map((allPlans) => {

        const [data, speed, ...remainingSubstringArray] = allPlans.planDetails.split(" ");
        const note = remainingSubstringArray.join(" ");

        const formattedData = data.toUpperCase() ;
        const formattedSpeed = speed.toUpperCase() ;

        return (
          <PlanItems
            id={allPlans.planId}
            type={allPlans.planType}
            name={allPlans.planName}
            validity={allPlans.planValidity}
            offers={allPlans.planOffers}
            data={formattedData}
            speed={formattedSpeed}
            note={note}
            price={allPlans.planPrice}
          />
        );
      })}
    </div>
  );
};

export default Plans;
