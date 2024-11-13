

import * as React from "react"




import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"





export function SettingsForm() {


    



  return (
    

    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Settigns</CardTitle>
        <CardDescription>change Settings account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">user</Label>
              <Input name="user" id="user" placeholder="change your user" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">password</Label>
              <Input name="password" id="password" placeholder="change your password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPass">confirmPass</Label>
              <Input name="confirmPass" id="confirmPass" placeholder="Confirm your password" />
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" >Cancel</Button>
        <Button variant="outline">save</Button>
      </CardFooter>
    </Card>
  )
}

