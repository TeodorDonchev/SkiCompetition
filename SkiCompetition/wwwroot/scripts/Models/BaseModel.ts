export default abstract class BaseModel{
    public save() {
        console.log('saved!');
    }
    public abstract getServerData(): string;
}