import { Button } from "@/components/ui/button";
import { SquaresPlusIcon } from "@heroicons/react/16/solid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from "axios";
import { DASHBOARD_API } from "@/lib/endpoints";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";
import { Project } from "@/lib/types";
// import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";


interface AddProjectProps {
  projectAdded: boolean;
  setProjectAdded: (value:React.SetStateAction<boolean>) => void;
}

export default function AddProject(props: AddProjectProps) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  // const [ipWhiteList, setIpWhiteList] = useState<string[]>([]);

  const allFieldsFilled = projectName && projectDescription;
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { toast } = useToast()
  const handleCreateProject = async () => {
    setIsLoading(true)
    // e.preventDefault();
    try {
      const res = await axios.post(DASHBOARD_API, {
        name: projectName,
        description: projectDescription,
      }, {
        withCredentials: true
      })
      const project = await res.data
      setIsLoading(false)
      toast({
        description: "Your Project was added successfully"
      })
      props.setProjectAdded(!props.projectAdded)
      setSuccess(true)

      console.log(project)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      toast({
        description: "Unable to add project please try again later"
      })
    }

  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant={"secondary"}>
            New Project &nbsp;
            <SquaresPlusIcon className="w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-card font-semibold">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              { !success ?
                "Create a new project using AkashPay API" : "Project added successfully!"
              }
            </DialogDescription>
          </DialogHeader>
          {isLoading ?
            (
              <Spinner className="w-10 h-10" />
            ) : !success ? (
              <>
                <form className="my-2 flex flex-col gap-3">
                  <div>
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      placeholder="New API"
                      required
                      onChange={(e) => {
                        setProjectName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="A brief description.."
                      required
                      onChange={(e) => {
                        setProjectDescription(e.target.value);
                      }}
                    />
                  </div>
                  {/* <div>
                  <Label htmlFor="callback" className="text-primary font-bold">
                    Ip Whitelist <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>These are the list of Ip's from where the request is allowed</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="callback"
                    placeholder="http://localhost:3001"
                    required
                    onChange={(e) => {
                      setIpWhiteList(e.target.value.split(' '))
                    }}
                  />
                </div> */}
                </form>
                <DialogFooter className="sm:justify-start">
                  <Button
                    type="submit"
                    disabled={!allFieldsFilled}
                    className="w-full font-extrabold"
                    onClick={handleCreateProject}
                  >
                    Create&nbsp;
                    <SquaresPlusIcon className="w-5" />
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Success</span>
              </div>
            )
          }
        </DialogContent>
      </Dialog>
    </>
  );
}
