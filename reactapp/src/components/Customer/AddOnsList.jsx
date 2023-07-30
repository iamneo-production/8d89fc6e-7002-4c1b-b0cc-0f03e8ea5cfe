  import UserAddOnItems from './UserAddOnItems';

const AddOnsList = (addons) => {
  return (
    <div>
      {addons.items.map((allAddons) => {

        const [data, speed, ...remainingSubstringArray] = allAddons.addonDetails.split(" ");
        const note = remainingSubstringArray.join(" ");

        const formattedData = data.toUpperCase() ;
        const formattedSpeed = speed.toUpperCase() ;

        return (
          <UserAddOnItems
            id={allAddons.addonId}
            type={allAddons.addonType}
            name={allAddons.addonName}
            validity={allAddons.addonValidity}
            data={formattedData}
            speed={formattedSpeed}
            note={note}
            price={allAddons.addonPrice}
          />
        );
      })}
    </div>
  );
};

export default AddOnsList;
