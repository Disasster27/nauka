import './style/style.css';
import './style/style.scss'
import './babel.js';
import pyotr from './images/pyotr-1.jpg';
import ava from './images/ava.png';



document.addEventListener('DOMContentLoaded', () => {


    

    class PersonGrid {
        constructor() {
            this.selectedElement = null;
            this.counter = 0;
            this.addEvent();
            this.allPerson = {};
        };
        addEvent () {
            document.querySelector('.control__save').addEventListener('click', () => {
                document.querySelector('.blackout').classList.add('invisible');
                this.addRov ();
            });
            document.querySelectorAll('tr').forEach(item => {
                item.addEventListener('click', e => {
                    event.target.parentElement.classList.toggle('select');
                })
            });
            document.querySelector('.control__cancel').addEventListener('click', () => {
                document.querySelector('.blackout').classList.add('invisible');
            });
            document.querySelector('.interaction__add').addEventListener('click', () => {
                document.querySelector('.blackout').classList.remove('invisible');
            });
            document.querySelector('.interaction__delete').addEventListener('click', () => {
                this.removePerson();
            });
            document.querySelector('.interaction__edit').addEventListener('click', () => {
                this.editPerson();
            });
        };
        addRov () {
                const personInfo = {
                    img: ava,
                    name: document.querySelector('input[name="name"]').value.trim(),
                    family: document.querySelector('input[name="family"]').value.trim(),
                    date: document.querySelector('input[name="date"]').value,
                    position: document.querySelector('select[name="position"]').value,
                    remote: document.querySelector('input[name="remote"]').checked,
                    address: {
                        city: document.querySelector('input[name="city"]').value.trim(), 
                        street: document.querySelector('input[name="street"]').value.trim(), 
                        house: document.querySelector('input[name="house"]').value.trim(), 
                        apart: document.querySelector('input[name="apart"]').value.trim(),
                    },
                }; 
        
                let per = new Person(personInfo, grid);
                console.log(per)
        };
        removePerson () {
            this.selectedElement.remove();
        };
        editPerson () {
            document.querySelector('.blackout').classList.remove('invisible');
            console.log('this.selectedElement:', this.selectedElement)
        };

    };

    class Person {
        constructor (personInfo, grid) {
            this.grid = grid;
            this.id = 1;
            this.img = personInfo.img;
            this.name = personInfo.name;
            this.family = personInfo.family;
            this.dateOfBirth = personInfo.date;
            this.position = personInfo.position;
            this.isRemote = personInfo.isRemote;
            this.address = personInfo.address;
            this.isMark = personInfo.isMark;  
            this.element = null;
            this.render();
        };
        render () {
            const table = document.querySelector('tbody');
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `<td><img src="${this.img} " alt=""></td>
                                    <td class="bord">${this.name} </td>
                                    <td>${this.family} </td>
                                    <td>${this.setPoints ()} </td>
                                    <td>${this.setAge ()} </td>
                                    <td>${this.position} </td>
                                    <td><input type="checkbox" ${this.isRemote ? 'checked' : ''}></td>
                                    <td>${this.setAddress ()} </td>`; 
            table.insertAdjacentElement('beforeend', tableRow);
            this.element = tableRow;
            this.addEvent ()
            
            
        };
        addEvent () {
            this.element.addEventListener('click', e => {

                if (this.grid.selectedElement) {
                    this.grid.selectedElement.classList.remove('select');
                    if (this.grid.selectedElement == this.element) {
                        this.grid.selectedElement = null;
                        return;
                    };
                };
                if(this.grid.selectedElement != this.element) {
                    this.grid.selectedElement = this.element;
                    this.grid.selectedElement.classList.add('select');
                };
            });
        };
        setPoints () {
            return this.dateOfBirth.split('-').reverse().join('.');
        };
        setAge () {
            return new Date().getFullYear() - this.dateOfBirth.split('-')[0];
        };
        setAddress () {
            return `г.${this.address.city}, ${this.address.street}, ${this.address.house} кв.${this.address.apart}`
        };
    }

    const grid = new PersonGrid();

});