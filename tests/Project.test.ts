import fs from 'fs';
import path from 'path';
import Project from '../src/Services/Project';

jest.mock('fs');

describe('Project', () => {
    const projectRoot = path.join(process.cwd(), 'projects');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a project with a valid ID', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        expect(project.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    test('should generate a new ID if none is provided', () => {
        const project = new Project();
        expect(project.id).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
    });

    test('should throw an error for an invalid ID', () => {
        expect(() => new Project('invalid-id')).toThrow('Invalid project ID format.');
    });

    test('should check if project exists', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        (fs.existsSync as jest.Mock).mockReturnValue(true);

        expect(project.exists()).toBe(true);
        expect(fs.existsSync).toHaveBeenCalledWith(path.join(projectRoot, project.id));
    });

    test('should create a new project', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        (fs.existsSync as jest.Mock).mockReturnValue(false);

        project.create('127.0.0.1');

        expect(fs.mkdirSync).toHaveBeenCalledTimes(4);
        expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(projectRoot, project.id));
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            path.join(projectRoot, project.id, 'project.json'),
            expect.any(String)
        );
    });

    test('should throw an error when creating an existing project', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        (fs.existsSync as jest.Mock).mockReturnValue(true);

        expect(() => project.create('127.0.0.1')).toThrow(`Cannot recreate an existing project (${project.id}).`);
    });

    test('should update the sequence in project.json', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        const initialData = { sequence: [], modifiedAt: new Date().toISOString() };
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(initialData));

        const newSequence = [{ id: '1' }, { id: '2' }];
        project.updateSequence(newSequence);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            path.join(projectRoot, project.id, 'project.json'),
            expect.stringContaining('"sequence":')
        );
    });

    test('should delete an existing project', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        (fs.existsSync as jest.Mock).mockReturnValue(true);

        project.delete();

        expect(fs.rmSync).toHaveBeenCalledWith(path.join(projectRoot, project.id), { recursive: true, force: true });
    });

    test('should throw an error when deleting a non-existing project', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        (fs.existsSync as jest.Mock).mockReturnValue(false);

        expect(() => project.delete()).toThrow(`There is no project with this id (${project.id}).`);
    });

    test('should read project data from project.json', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        const mockData = { sequence: [] };
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));

        const data = project.read();

        expect(data).toEqual(mockData);
        expect(fs.readFileSync).toHaveBeenCalledWith(path.join(projectRoot, project.id, 'project.json'), 'utf-8');
    });

    test('should throw an error when reading a non-existing project', () => {
        const project = new Project('123e4567-e89b-12d3-a456-426614174000');
        (fs.existsSync as jest.Mock).mockReturnValue(false);

        expect(() => project.read()).toThrow(`Project ${project.id} does not exist.`);
    });
});