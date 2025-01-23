import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const GeneralConfig = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>
          Customize the look and feel of your timetable.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default GeneralConfig;