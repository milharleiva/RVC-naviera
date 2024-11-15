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

interface SettingsFormProps {
  settings: {
    user: string;
    password: string;
    confirmPass: string;
  };
  register: (name: keyof SettingsFormProps['settings']) => { [key: string]: unknown };
}

export function SettingsForm({ register }: SettingsFormProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Change account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user">User</Label>
              <Input name="user" id="user" placeholder="Change your user" {...register("user")} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" placeholder="Change your password" {...register("password")} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPass">Confirm Password</Label>
              <Input name="confirmPass" id="confirmPass" placeholder="Confirm your password" {...register("confirmPass")} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Save</Button>
      </CardFooter>
    </Card>
  )
}
