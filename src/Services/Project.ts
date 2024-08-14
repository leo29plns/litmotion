import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

/**
 * Represents a project with a unique identifier.
 */
class Project
{
    public id: string;
    private paths: any;

    /**
     * Creates an instance of Project.
     * @param id - The project ID. If no ID is provided, a new ID will be generated.
     * @throws {Error} Throws an error if the provided ID is invalid.
     */
    constructor(id: (string | null) = null)
    {
        const projectsFolder = path.join(process.cwd(), 'projects');

        this.paths = {
            projectsFolder
        };

        if (id && !this.isValidId(id)) {
            throw new Error('Invalid project ID format.');
        }

        this.id = id || this.generateId();

        const projectFolder = path.join(projectsFolder, this.id);
        const projectFile = path.join(projectFolder, 'project.json');

        this.paths = {
            projectsFolder,
            projectFolder,
            projectFile
        };
    }

    /**
     * Checks if the project exists.
     * @returns {boolean}
     */
    public exists(): boolean
    {
        return fs.existsSync(this.paths['projectFolder']);
    }

    /**
     * Creates the project directory with necessary subdirectories if the project does not exist.
     * Subdirectories created include: `frames`, `compositions`, and `renders`.
     * Also creates a `project.json` file with creation and modification timestamp, IP, and an empty sequence.
     * @param ip - The IP address of the creator.
     */
    public create(ip: (string | null) = null): void
    {
        if (this.exists()) {
            throw new Error(`Cannot recreate an existing project (${this.id}).`);
        }

        const subfolders = ['frames', 'compositions', 'renders'];
        const data = {
            createdAt: new Date().toISOString(),
            createdBy: ip,
            sequence: []
        };

        fs.mkdirSync(this.paths['projectFolder']);

        for (const subfolder of subfolders) {
            fs.mkdirSync(path.join(this.paths['projectFolder'], subfolder));
        }

        fs.writeFileSync(path.join(this.paths['projectFolder'], 'versions.json'), '[]');

        this.write(data);
    }

    /**
     * Updates the `sequence` list in the project's JSON file.
     * @param newSequence - The new sequence data to be added or modified.
     */
    public updateSequence(newSequence: any[]): void
    {
        const data = this.read();
        data.sequence = newSequence;

        this.write(data);
    }

    /**
     * Deletes the project directory and all its contents if the project exists.
     */
    public delete(): void
    {
        if (!this.exists()) {
            throw new Error(`There is no project with this id (${this.id}).`);
        }

        fs.rmSync(this.paths['projectFolder'], { recursive: true, force: true });
    }

    /**
     * Reads the project's JSON data.
     * @returns {any} - The parsed JSON object from `project.json`.
     * @throws {Error} Throws an error if the project does not exist or the file cannot be read.
     */
    public read(): any {
        if (!this.exists()) {
            throw new Error(`Project ${this.id} does not exist.`);
        }

        const data = fs.readFileSync(this.paths['projectFile'], 'utf-8');
        return JSON.parse(data);
    }

    /**
     * Writes data to the project's JSON file and updates the `modifiedAt` timestamp.
     * @param data - The data to write to `project.json`.
     * @private
     */
    private write(data: any): void {
        data.modifiedAt = new Date().toISOString();

        fs.writeFileSync(this.paths['projectFile'], JSON.stringify(data, null, 4));
    }

    /**
     * Generates a unique ID for the project.
     * @returns {string} - The generated ID.
     */
    private generateId(): string
    {
        let newId: string;

        do {
            newId = uuidv4();
        } while (fs.existsSync(path.join(this.paths['projectsFolder'], newId)));

        return newId;
    }

    /**
     * Validates the provided project ID.
     * @param id - The project ID to validate.
     * @returns {boolean} - `true` if the ID is valid, otherwise `false`.
     */
    private isValidId(id: string): boolean
    {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        return uuidRegex.test(id);
    }
}

export default Project;