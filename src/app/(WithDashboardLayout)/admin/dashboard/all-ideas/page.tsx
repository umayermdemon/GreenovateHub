import AllIdeaPage from "@/components/modules/Idea/AllIdeaPage";

const AllIdeas = async () => {
    return (
        <div className=" lg:mx-6">
            <div className="mb-6 space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-green-500 mt-2">All Ideas</h1>
                <p className="text-muted-foreground text-sm">
                    Browse, search, and manage all submitted ideas. Use filters and search to find what you need.
                </p>
            </div>
            <AllIdeaPage />
        </div>
    );
};

export default AllIdeas;