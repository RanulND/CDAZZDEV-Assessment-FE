export enum courseModes {
    ONLINE = "online",
    PHYSICAL = "physical"
}
export interface Course {
    name: string
    courseId?: string
    tutor: string
    mode: courseModes.ONLINE | courseModes.PHYSICAL
}