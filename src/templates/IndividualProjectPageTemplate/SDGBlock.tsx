import Image from "next/image";

function SDGBlock(props: { sdgs: (number | string)[] }) {
  const { sdgs } = props;

  return (
    <div className="flex flex-wrap gap-2">
      {sdgs.map((sdg) => {
        const url = `https://positiveblockchain.io/wp-content/uploads/sdg/E_SDG%20goals_icons-individual-rgb-${sdg}.png`;

        return (
          <Image
            key={"SDG-" + sdg}
            src={url}
            alt={"SDG-" + sdg}
            width={100}
            height={100}
          />
        );
      })}
    </div>
  );
}

export default SDGBlock;
