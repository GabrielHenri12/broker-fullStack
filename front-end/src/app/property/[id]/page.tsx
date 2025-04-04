import DetailsProperyView from "@/sections/property/view/details-propery-view";

export default function page({ params }: { params: { id: string } }) {
    return <DetailsProperyView id={params.id} />;
}
